import { render, screen } from "@testing-library/react";
import AreaGraph from "../AreaGraph";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={400}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe("AreaGraph Component", () => {
  it("should display the graph with dates", async () => {
    render(
      <AreaGraph
        data={[
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
        ]}
      />
    );

    expect(screen.getByText("Balance over time")).toBeInTheDocument();

    const dates = ["2024-10-26", "2024-09-15", "2024-10-27", "2024-08-06"];
    dates.forEach((date) => {
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  it("should display empty graph if no data", async () => {
    render(<AreaGraph data={[]} />);

    expect(screen.getByText("Balance over time")).toBeInTheDocument();
    expect(
      screen.queryByText("2024", { exact: false })
    ).not.toBeInTheDocument();
  });
});
