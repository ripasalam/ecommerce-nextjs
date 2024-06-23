/*
  Warnings:

  - You are about to drop the column `PaymentPaymentIntentId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_PaymentPaymentIntentId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "PaymentPaymentIntentId",
ADD COLUMN     "paymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

