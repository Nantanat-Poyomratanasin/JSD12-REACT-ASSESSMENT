# React Assessment

แยก UI ตามเป็น component หน้าที่

- Navbar
- User Section
- Admin Section
- Owner Section
- Table

# Step 1: ใช้ useState ในการเก็บ state ของหน้า โดยที่เมื่อ state เปลี่ยน React จะ render ของที่อยู่ข้างใน

const [page, setPage] = useState("home");
const [section, setSection] = useState("home");

# Step 2: เมื่อกดปุ่ม onฉสรแา() จะทำงาน

React เรียก setSection("user") ทำให้ตัวแปร section เปลี่ยนเป็นของที่อยู่ข้างใน

# Step 3: Render ตาม condition

ใช้เงื่อนไขในการควบคุมสิ่งที่แสดง
เช่นถ้า section มีค่าเป็น "admin" ให้แสดง div นี้

{section === "admin" && (

  <div>Admin Content</div>
)}

# Step 4: โหลดข้อมูลจาก API โดยใช้ fetch()

useEffect(() => {
fetchMembers();
}, []);

# Step 5: fetchMembers() เป็น asynchronous function เพราะการเรียก API ต้องรอข้อมูลจาก server โดยจะส่ง request ไปหา API แล้วแปลงเป็น JSON แล้วเก็บข้อมูลลง State (เก็บข้อมูลสมาชิก) เมื่อ state เปลี่ยน React จะ render table ใหม่อัตโนมัติ

-ใช้ UseEffect โหลดข้อมูลสมาชิกตอนเปิดเว็บครั้งแรก ใช้เพื่อบอก Reactว่าให้ทำงานหลังจาก render

# Step 6: สร้าง table สมาชิก โดย React จะเรียก renderTable() เพื่อสร้าง JSX ของ table แล้วจะถูก render บนหน้าเว็บ

# Step 7: Form สร้างข้อมูลสมาชิก (เฉพาะ หน้า Admin) โดยที่เมื่อกรอกเสร็จแล้วกดปุ้มจะทำการsubmit form แล้ว handleSave() ทำงาน แล้วส่งไปที่ API ด้วย Post จากนั้น setMembers() จะเปลี่ยนข้อมูลสมาชิกใน state แล้ว react ก็จะ render table ใหม่

# Step 8: Delete ทำงานโดย จะส่ง Delete Request ไปที่ API แล้วลบสมาชิกออกจาก State จากนั้น React จะทำการ Render ใหม่

# Step 9: เมื่อกดปุ่ม Owner Owner Page React จะ render function renderOwner() เพื่อแสดงข้อมูล Owner
