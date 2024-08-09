# Company Chat
The project aims to develop a full-stack application using .NET and React with TypeScript. MongoDB is the choosen database. The key functionalities include
- Create an account
- Login
- Access the Workspace. The workspace is the place where the user chat with other users.
- Send messages
- Real-time messages
- Notifications 

**Disclaimer** 

This project is under construction and a few "standard business rules" will not be in place yet. Also, there are planned features that are not implemented yet. Unit tests will be available soon

## Goal
Explore the benefits of [Atomic Design](https://atomicdesign.bradfrost.com/) on creating reusable client side components. Also, I wanted to explore [HotChocolate](https://chillicream.com/docs/hotchocolate/v13),
and its benefits. Once I learned about the the power of [HotChocolate Subscriptions](https://chillicream.com/docs/hotchocolate/v13/defining-a-schema/subscriptions), I was eager to develop
something using it


## Application overview
![image](https://github.com/user-attachments/assets/6b44fd91-9312-4bca-8395-c11ffcbdee99)

### Connecting to the Event Store
There are three main events that each user should look to. 
- New messages
- User status
- Current Chat Messages
- 
![image](https://github.com/user-attachments/assets/3ce92a54-bce5-41d3-83f8-4f7942fcb5cc)

If the chat is not open, increasing the unviewed message count is enough. When the chat is open, it is required to show to the user all the latest messages. 


## Login workflow
This is the current state of the authentication workflow

![image](https://github.com/user-attachments/assets/c89112b1-2cee-4a26-82f6-1af768f77cd2)

## Atomic design
I decided to use only Atoms, Molecules, and Organisms for this project. Since it is a small project, I believe these three is units are enough for what I need to do.

![image](https://github.com/user-attachments/assets/8b610d79-a9c3-4a1b-92b8-f05c1f0b0292)







