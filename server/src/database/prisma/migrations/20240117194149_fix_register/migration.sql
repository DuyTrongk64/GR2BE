-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPENING', 'CLOSE');

-- AlterTable
ALTER TABLE "registration" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OPENING',
ALTER COLUMN "semester" SET DATA TYPE TEXT;

-------------------------------------------------------------------------------------------


-- Tạo một function PL/pgSQL để cập nhật trường `participants` trong bảng `Room`
CREATE OR REPLACE FUNCTION update_room_participants()
RETURNS TRIGGER AS $$
BEGIN
  -- Cập nhật trường `participants` dựa trên số lượng user có cùng `room_id`
  UPDATE room
  SET participants = (SELECT COUNT(*) FROM "users" WHERE room_id = NEW.room_id)
  WHERE room_id = NEW.room_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger để theo dõi sự kiện insert, update, và delete trên bảng `User`
CREATE TRIGGER room_trigger
AFTER INSERT OR UPDATE OR DELETE ON "users"
FOR EACH ROW EXECUTE FUNCTION update_room_participants();

-------------------------------------------------------------------------------------------

-- Tạo một function PL/pgSQL để cập nhật total_student và total_room trong bảng Apartment
CREATE OR REPLACE FUNCTION update_apartment_totals()
RETURNS TRIGGER AS $$
BEGIN

  -- Cập nhật total_student và total_room dựa trên apartment_id
  UPDATE apartment
  SET
    total_student = (SELECT SUM(participants) FROM room WHERE apartment_id = (SELECT apartment_id FROM Room WHERE room_id = NEW.room_id)),
    total_room = (SELECT COUNT(*) FROM room WHERE apartment_id = (SELECT apartment_id FROM Room WHERE room_id = NEW.room_id))
  WHERE apartment_id = (SELECT apartment_id FROM Room WHERE room_id = NEW.room_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger để theo dõi sự kiện insert, update và delete trên bảng User
CREATE TRIGGER apartment_trigger
AFTER INSERT OR UPDATE OR DELETE ON "users"
FOR EACH ROW EXECUTE FUNCTION update_apartment_totals();