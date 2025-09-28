## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Update schema

หากมีการเปลี่ยนแปลงโครงสร้าง schema ของ database ให้ run คำสั่ง

```bash
npx prisma migrate dev --name <ชื่อ migrate>
```
โดย <ชื่อ migrate> คือชื่อของการ migrate นั้นๆ เช่น create table user, update อะไร
