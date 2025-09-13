import { db } from "../prisma";
import { inngest } from "./client";

export const checkBudgetAlert = inngest.createFunction(
    { name: "Check Budget Alerts" },
    { cron: "0 */6 * * *" },
    async ({ step }) => {
        const budgets = await step.run("fetch-budget", async () => {
            return await db.budget.findMany({
                include: {
                    user: {
                        include: {
                            accounts: {
                                where: {
                                    isDefault: true,
                                },
                            },
                        },
                    },
                },
            });
        });

        for (const budget of budgets) {
            const defaultAccount = budget.user.accounts[0];
            if (!defaultAccount) continue;

            await step.run(`check-budget-${budget.id}`, async () => {
                const startDate = new Date();
                startDate.setDate(1);

                const currentDate = new Date();
                const startofMonth = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                )

                const endOfMonth = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    0
                )

                const expenses = await db.transaction.aggregate({
                    where: {
                        userId: budget.userId,
                        accountId: defaultAccount.id,
                        type: "EXPENSE",
                        date: {
                            gte: startofMonth,
                            lte: endOfMonth,
                        },
                    },
                    _sum: {
                        amount: true,
                    },
                });

                const totalExpenses = expenses._sum.amount?.toNumber() || 0;
                const budgetAmount = budget.amount
                const percentageUsed = (totalExpenses / budgetAmount) * 100;

                if (percentageUsed >= 80 && (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date()))) {
                    // Send Email and Update LastAlertSent
                    await db.budget.update({
                        where: { id: budget.id },
                        data: { lastAlertSent: new Date() },
                    })

                }
            });

        }

    }
);

function isNewMonth(lastAlertDate, currentDate) {
    return (
        lastAlertDate.getMonth() !== currentDate.getMonth() ||
        lastAlertDate.getFullYear() !== currentDate.getFullYear()
    )
}