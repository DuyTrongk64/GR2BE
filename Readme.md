- [Yêu cầu](#yêu-cầu)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cách chạy dự án với Backend Dev](#cách-chạy-dự-án-với-backend-dev)
  - [Lưu ý ban đầu](#lưu-ý-ban-đầu)
  - [Để chạy service Postgres bằng docker, có thể dùng 1 trong 2 option sau](#để-chạy-service-postgres-bằng-docker-có-thể-dùng-1-trong-2-option-sau)
  - [Các command khác của Makefile để tiện trong việc dev](#các-command-khác-của-makefile-để-tiện-trong-việc-dev)
  - [Sử dụng CLI để generate các template Controller và Route](#sử-dụng-cli-để-generate-các-template-controller-và-route)
  - [Chú ý](#chú-ý)
- [Cách chạy dự án với Frontend Dev](#cách-chạy-dự-án-với-frontend-dev)

## Yêu cầu

- Cài đặt Docker, đăng nhập vào account DockerHub được cung cấp trên Slack. Và cài đặt thêm Makefile.
- Cài đặt Postgresql ở Local. Clone source code về và chạy trong folder server.

## Cấu trúc thư mục

```bash
.
├── infrastructure          # Cài đặt DB và server cho dự án
│   ├── backend
│   ├── docker-compose.yaml
│   ├── Makefile
│   └── postgresql
├── Makefile               # Makefile cho Infrastructure, có thể thực thi từ thư mục root
├── Readme.md
└── server                 # Folder Source code server
    ├── cli                # Cài đặt CLI cho dự án
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── src
        ├── app.js         # Khai báo các middleware và các endpoint /api/
        ├── config         # Parse các biến môi trường để dễ quản lý (ko cần chỉnh sửa phần này)
        ├── controllers    # Xử lý logic cho các endpoint tương ứng
        ├── database       # Kết nối tới Prisma và seed data
        ├── index.js       # File khởi động server
        ├── routes         # Định nghĩa các endpoint CRUD
        ├── service        # Xử lý các service bên thứ 3
        └── utils          # Định nghĩa các hàm hỗ trợ
```

## Cách chạy dự án với Backend Dev

### Lưu ý ban đầu

- Đối với người làm Backend, chỉ nên sử dụng Docker để chạy Database

- Khi nào dev và test xong xuôi thì build và push image lên repository chứ không nên khởi động service server

### Để chạy service Postgres bằng docker, có thể dùng 1 trong 2 option sau

```bash
# ITSS2-BE folder || infrastructure folder
make db
```

```bash
# Server folder
itss db-up
```

### Các command khác của Makefile để tiện trong việc dev

```bash
# ITSS2-BE folder || infrastructure folder
make help
```

### Sử dụng CLI để generate các template Controller và Route

(có thể không sử dụng nhưng nên sử dụng cho nhất quán)

```bash
# server folder
npm i -g .
itss make:controller <controller_name>
itss make:route <route_name>
```

### Chú ý

- Trước khi commit, chạy lệnh format để format các file theo rule

```bash
# server folder
npm run format
```

## Cách chạy dự án với Frontend Dev

```bash
# ITSS2-BE folder || infrastructure folder
make up
```
