**DynamiBug Planner**

**Introduction**

The DynamiBug Planner is a web application designed to assist and encourage new developers in creating better projects and learning real-world skills. It provides a platform for developers to collect bug reports from users, track bug-fixing progress, and share updates with project guests. This comprehensive design document outlines the architecture, system design, and functionalities of the DynamiBug Planner web application.

**Scope**

The DynamiBug Planner is a full-fledged bug tracking system built as a web application. It consists of a frontend developed using the React JavaScript library, Bootstrap for styling, an API backend built with the ASP.NET Core framework, and an MS SQL Server database (though initially, the ASP.NET in-memory database will be used). The project will be beginner and solo-developer friendly, making it accessible for new developers to contribute and utilize.

**Features**

- Project-specific report tracking for portfolios.
- Comprehensive report filtering by type, project, status, and priority.
- User-friendly project and report management.
- Interactive comments on reports for collaborative bug-fixing efforts.
- Whiteboard-style bug-fix planning, allowing for drawing, image uploads, and text notes.

**Technology Stack**

- ASP.NET Core for the API backend.
- Entity Framework Core (EF Core) for data access and management.
- React JavaScript library for building the frontend user interface.
- Azure cloud platform for scalable and reliable hosting.
- SQL Server for database management.
- Amazon S3 or Azure Blob Storage for file storage.
- OAuth for secure user authentication and authorization.
- Captcha for spam prevention.
- SendGrid as the email delivery platform for transactional and marketing emails.

**Design and Implementation Constraints**

- Easy accessibility through a web application.
- Development time constraint of two weeks.
- All users must be on the same network as the development server.
- Development server must have required tools like git, npm, and dotnet installed.

**User Classes and Characteristics**

The application caters to four types of users:
- Administrator: Has full authority over the system.
- Manager: Can create, view, edit, and delete projects and reports.
- User: Can view projects, create and edit their own bug reports, and leave comments.
- Visitor: Can view projects and bug reports but cannot interact or leave comments.

**Operating Environments**

- Visual Studios 2022 for development.
- Web server for hosting the application.
- Azure SQL Database for project, report, and comment storage.

**Future Plans**

The DynamiBug Planner has a clear roadmap for future enhancements, including:
- Implementing Identity and JWT for improved user authentication and security.
- Leveraging Azure services for advanced functionalities.
- Integrating an email provider for seamless communication with users.
- Refactoring and optimization to enhance performance.
- Exploring additional features to enhance the user experience.

**Description**

The DynamiBug Planner is a user-friendly bug tracking web application designed to empower new developers to build better projects and gain real-world skills. It allows portfolio owners to collect bug reports from users and track bug-fixing progress. The application features a seamless frontend built with React and Bootstrap, and a powerful API backend powered by ASP.NET Core. With its efficient use of Azure cloud services, SQL Server, and file storage, the DynamiBug Planner ensures secure, reliable, and scalable bug tracking for portfolios. This project is an excellent tool for any solo developer or portfolio owner who wants to engage with their users, fix bugs efficiently, and continuously improve their projects.

**Development Team**

The DynamiBug Planner is developed by Oluwasegun Atolagbe and Kyle Kreml, aiming to provide a valuable resource for new developers to learn, grow, and collaborate effectively on their projects.
