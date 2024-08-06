-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_method" TEXT,
ALTER COLUMN "transaction_status" DROP NOT NULL;
