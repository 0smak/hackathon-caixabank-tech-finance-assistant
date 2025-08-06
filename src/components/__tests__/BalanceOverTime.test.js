import { useStore } from "@nanostores/react";
import { render } from "@testing-library/react";
import AreaGraph from "../AreaGraph"; // Asegúrate de importar el componente original
import BalanceOverTime from "../BalanceOverTime";

jest.mock("@nanostores/react", () => ({
  useStore: jest.fn(),
}));

jest.mock("../AreaGraph", () => {
  return jest.fn(() => <div>Balance over time</div>);
});

describe("BalanceOverTime Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the AreaGraph with the correct data", async () => {
    const mockTransactions = [
      {
        id: "m2qfabje1tpc893m",
        description: "Web Dev Salary",
        amount: 1000,
        type: "income",
        category: "Salary",
        date: "2024-10-26",
      },
      {
        id: "m2q50s7e8wpfe0e1",
        description: "My medicines",
        amount: 20,
        type: "expense",
        category: "Health",
        date: "2024-09-15",
      },
      {
        id: "m2rh7cb2h02cjpzb",
        description: "Birthday gift",
        amount: 11,
        type: "expense",
        category: "Gifts and Donations",
        date: "2024-10-27",
      },
      {
        id: "m2rkjf8qvsfwek3l",
        description: "Smartphone",
        amount: 800,
        type: "expense",
        category: "Entertainment",
        date: "2024-08-06",
      },
    ];

    useStore.mockReturnValue(mockTransactions);

    await render(<BalanceOverTime />);

    expect(AreaGraph).toHaveBeenCalledWith(
      { data: mockTransactions },
      expect.anything()
    );
  });
});
