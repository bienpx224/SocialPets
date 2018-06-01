# Sails js + ReactJS(Redux) + MongoDB

a [Sails](http://sailsjs.org) application
## DEMO
  - Deploying....
### ABSTRACT OF THESIS  
  The content of the project is the process of learning, analyzing and designing the system, learning the technology, building and developing the social pet social pet system, divided into 3 chapters with small items. Details about the project:

  Chapter I. Problem and solution orientation:
  - Find out, determine the problem set, the purpose of the project and the solution to solve, introduce an overview of the subject of social networking pet.
  - Determine the main functions of the system, the technology used and expected results.

  Chapter II. System Design Analysis:
	- System analysis, design: Identify system actors, design and description Use case, sequence diagram design, class diagram and database design.
	- Develop the program, test the system and present the results, advantages and disadvantages of the system.
	- Evaluate the system, compare, contact the existing pet social network.

  Chapter III. Conclude:
  - General assessment of the results of the project, evaluation of the work done
  - Future direction to develop and improve the results achieved.

#### SETUP

Cài đặt môi trường Nodejs
- Cài đặt và cấu hình Database MongoDB, chạy server MongoDB
- Clone Đồ án Mạng xã hội thú cưng về từ link github:
-	Vào thư mục trên, mở Terminal, thực hiện cài đặt các package cần thiết để có thể xây dựng hệ thống
-	Chạy lệnh:     
`
npm install
`
-	Sau đó khởi chạy server bằng lệnh:  
`
sails lift
`
-	Đồng thời mở 1 terminal mới và khởi chạy webpack, đóng gói các file giao diện, css, js vào static asset để sử dụng trong hệ thống, chạy lệnh:
`
webpack -w
`
-	Mở Browser và nhập URL:
http://localhost:1337
-	Tại đó sẽ hiển thị lên giao diện người dùng, trang đăng kí, đăng nhập để người dùng có thể từ đó tiếp tục trải nghiệm hệ thống trên Localhost.
