import { useStore } from "@nanostores/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { transactionsStore } from "../../stores/transactionStore";
import { userSettingsStore } from "../../stores/userSettingsStore";
import Settings from "../Settings";

jest.mock("@nanostores/react");
jest.mock("../../stores/userSettingsStore");
jest.mock("../../stores/transactionStore");
jest.mock("../../lib/transactionsUtils");

jest.mock("../../Context/NotificationContext", () => ({
  useNotification: () => ({
    showNotification: jest.fn(),
    closeNotification: jest.fn(),
  }),
}));

describe("Settings Component", () => {
  const mockUserSettings = {
    alertsEnabled: false,
    totalBudgetLimit: 1000,
    categoryLimits: {
      Food: 200,
      Travel: 150,
      Entertainment: 100,
    },
  };

  const mockTransactions = [];

  beforeEach(() => {
    useStore.mockImplementation((store) => {
      if (store === userSettingsStore) return mockUserSettings;
      if (store === transactionsStore) return mockTransactions;
    });
  });

  it("renders the settings form correctly", () => {
    render(<Settings />);

    expect(screen.getByText("Settings")).toBeInTheDocument();

    expect(screen.getByLabelText("Enable Alerts")).toBeInTheDocument();
    expect(screen.getByRole("switch")).not.toBeChecked();

    expect(screen.getByLabelText("Total Budget Limit (€)")).toHaveValue(1000);

    expect(screen.getByLabelText(/Food \(€\)/)).toHaveValue(200);
    expect(screen.getByLabelText(/Travel \(€\)/)).toHaveValue(150);
    expect(screen.getByLabelText(/Entertainment \(€\)/)).toHaveValue(100);
  });

  it("should enable alerts when switch is toggled", () => {
    render(<Settings />);

    const switchToggle = screen.getByRole("switch");
    fireEvent.click(switchToggle);

    expect(switchToggle).toBeChecked();
  });

  it("saves settings successfully and shows success message", () => {
    render(<Settings />);

    fireEvent.change(screen.getByLabelText("Total Budget Limit (€)"), {
      target: { value: 1200 },
    });
    fireEvent.change(screen.getByLabelText(/Food \(€\)/), {
      target: { value: 300 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save Settings/i }));

    expect(
      screen.getByText("Settings saved successfully.")
    ).toBeInTheDocument();
  });

  it("shows an error message if total category limits exceed the total budget limit", () => {
    render(<Settings />);

    fireEvent.change(screen.getByLabelText("Total Budget Limit (€)"), {
      target: { value: 1000 },
    });
    fireEvent.change(screen.getByLabelText(/Food \(€\)/), {
      target: { value: 800 },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save Settings/i }));

    expect(
      screen.getByText(
        "Total category limits exceed the total budget limit. Please update the total budget limit."
      )
    ).toBeInTheDocument();
  });
});
