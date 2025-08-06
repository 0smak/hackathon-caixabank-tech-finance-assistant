import { render, screen, fireEvent } from "@testing-library/react";
import ExportButton from "../ExportButton";

global.URL.createObjectURL = jest.fn(() => "mocked-url");
global.URL.revokeObjectURL = jest.fn();

describe("ExportButton Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render button with default label", () => {
    render(<ExportButton data={[]} headers={["key", "Budget", "Actual"]} />);
    expect(screen.getByText("Export CSV")).toBeInTheDocument();
  });

  it("should disable button if data is empty", () => {
    render(<ExportButton data={[]} headers={["key", "Budget", "Actual"]} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should convert data to CSV with Budget and Actual correctly", () => {
    const data = [
      { key: "2024-9", Budget: 1004, Actual: 376 },
      { key: "2024-8", Budget: 1004, Actual: 90 },
      { key: "2024-7", Budget: 1004, Actual: 23 },
    ];
    const headers = ["key", "Budget", "Actual"];
    const csvExpected =
      "key,Budget,Actual\n2024-9,1004,376\n2024-8,1004,90\n2024-7,1004,23";

    render(
      <ExportButton
        data={data}
        headers={headers}
        filename="budget_vs_actual.csv"
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(URL.createObjectURL).toHaveBeenCalled();

    const blobContent = URL.createObjectURL.mock.calls[0][0];
    const reader = new FileReader();

    reader.onload = () => {
      expect(reader.result).toEqual(csvExpected);
    };
    reader.readAsText(blobContent);
  });

  it("should convert data to CSV with Income and Expense correctly", () => {
    const data = [
      { key: "2024/08", Income: 0, Expense: 23 },
      { key: "2024/09", Income: 0, Expense: 90 },
      { key: "2024/10", Income: 2600, Expense: 376 },
    ];
    const headers = ["key", "Income", "Expense"];
    const csvExpected =
      "key,Income,Expense\n2024/08,0,23\n2024/09,0,90\n2024/10,2600,376";

    render(
      <ExportButton
        data={data}
        headers={headers}
        filename="income_vs_expense.csv"
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(URL.createObjectURL).toHaveBeenCalled();

    const blobContent = URL.createObjectURL.mock.calls[0][0];
    const reader = new FileReader();

    reader.onload = () => {
      expect(reader.result).toEqual(csvExpected);
    };
    reader.readAsText(blobContent);
  });

  it("should trigger download when button is clicked", () => {
    const data = [
      { key: "2024/08", Income: 0, Expense: 23 },
      { key: "2024/09", Income: 0, Expense: 90 },
    ];
    const headers = ["key", "Income", "Expense"];

    render(
      <ExportButton
        data={data}
        headers={headers}
        filename="income_vs_expense.csv"
      />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    const link = document.createElement("a");
    link.setAttribute("href", "mocked-url");
    link.setAttribute("download", "income_vs_expense.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
