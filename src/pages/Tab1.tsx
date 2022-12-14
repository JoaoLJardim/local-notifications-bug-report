import { LocalNotifications } from "@capacitor/local-notifications";
import { DeliveredNotificationSchema } from "@capacitor/local-notifications/dist/esm/definitions";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useCallback, useState } from "react";

import "./Tab1.css";

const Tab1: React.FC = () => {
  const [currentId, setCurrentId] = useState(0);
  const [message, setMessage] = useState<string[]>([]);
  const [currentNotifications, setCurrentNotifications] = useState<
    DeliveredNotificationSchema[]
  >([]);

  const updateNotificationList = useCallback(() => {
    LocalNotifications.getDeliveredNotifications().then(({ notifications }) => {
      setCurrentNotifications(notifications);
    });
  }, []);

  const addNotification = useCallback(
    (nextNotificationId: number) => {
      LocalNotifications.schedule({
        notifications: [
          {
            id: nextNotificationId,
            title: `${nextNotificationId} notification`,
            body: "",
          },
        ],
      }).then(() => {
        setMessage((v) => [...v, `Added ${nextNotificationId} notification`]);
        updateNotificationList();
      });
    },
    [updateNotificationList]
  );

  const handlerAddNotification = useCallback(() => {
    const nextNotificationId = currentId + 1;

    LocalNotifications.checkPermissions().then(({ display }) => {
      if (display === "prompt" || display === "prompt-with-rationale") {
        LocalNotifications.requestPermissions().then(({ display }) => {
          if (display === "granted") {
            addNotification(nextNotificationId);
          }
        });
      } else if (display === "granted") {
        addNotification(nextNotificationId);
      }
    });

    setCurrentId((v) => v + 1);
  }, [currentId, addNotification]);

  const handlerNotificationDelete = useCallback(
    (id: number) => {
      LocalNotifications.getDeliveredNotifications().then(
        ({ notifications }) => {
          const notificationToDelete = notifications.filter(
            (not) => not.id === id
          );

          notificationToDelete.forEach((not) => {
            setMessage((v) => [...v, `Removed ${not.id} notification`]);
          });

          LocalNotifications.removeDeliveredNotifications({
            notifications: notificationToDelete,
          }).then(() => {
            updateNotificationList();
          });
        }
      );
    },
    [updateNotificationList]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Local Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={handlerAddNotification}>
          Add new notification
        </IonButton>

        <IonList>
          <IonLabel>This is the list of notifications</IonLabel>
          {currentNotifications.map((ionic, index) => (
            <IonItem key={index}>
              <IonLabel> {ionic.id}</IonLabel>
              <IonButton onClick={() => handlerNotificationDelete(ionic.id)}>
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonLabel>Messages</IonLabel>
          {message.map((message) => (
            <IonItem>
              <IonLabel>{message}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
