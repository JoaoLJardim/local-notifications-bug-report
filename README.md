## How to Run

> Note: It's highly recommended to follow along with the [tutorial guide](https://ionicframework.com/docs/react/your-first-app), which goes into more depth, but this is the fastest way to run the app. 

0) Install Ionic if needed: `npm install -g @ionic/cli`.
1) Clone this repository.
2) In a terminal, change directory into the repo: `cd local-notifications-bug-report`.
3) Install all packages: `npm install`.
4) Run on the web: `ionic serve`.
5) Run on iOS or Android: See [here](https://ionicframework.com/docs/building/running).


# Steps To Reproduce 

- Click multiple times in `Add New Notification` to create multiple notifications
- Then you should see notifications in the list below
- Delete only one notification
- The list will become empty as i update the list using get `getDeliveredNotifications`
