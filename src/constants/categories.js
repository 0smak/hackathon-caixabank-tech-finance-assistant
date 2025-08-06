export const expenseCategories = [
  { emoji: "🍎", name: "Food" },
  { emoji: "🚗", name: "Transportation" },
  { emoji: "🏠", name: "Housing" },
  { emoji: "🎮", name: "Entertainment" },
  { emoji: "💊", name: "Health" },
  { emoji: "📚", name: "Education" },
  { emoji: "👗", name: "Clothing" },
  { emoji: "🎁", name: "Gifts and Donations" },
  { emoji: "🚙", name: "Travel" },
  { emoji: "💸", name: "Other Expenses" },
];

export const incomeCategories = [
  { emoji: "💰", name: "Salary" },
  { emoji: "📝", name: "Freelance" },
  { emoji: "💵", name: "Interest and Dividends" },
  { emoji: "🎁", name: "Gifts" },
  { emoji: "🛒", name: "Sales" },
  { emoji: "📈", name: "Other Income" },
];

export const allCategories = [...expenseCategories, ...incomeCategories];
