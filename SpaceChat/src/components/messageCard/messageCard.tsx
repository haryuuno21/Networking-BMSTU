import { FC } from "react";
import { Message } from "../../store/slices/messagesSlice/index.types";
import "./messageCard.css";

function formatTime(isoDateTime: string | number | Date) {
  const dateTime = new Date(isoDateTime);
  return dateTime.toLocaleString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
}

export const MessageCard: FC<{ message: Message }> = ({ message }) => {
  return (
    <div
      className={`message-card-container ${message.self ? `self` : ``} ${
        message.has_error === true ? `error` : ``
      }`}
    >
      <label className={`message-label ${message.self ? `self` : ``}`}>
        {message.username} {formatTime(message.send_time || "")}
      </label>
      <div className={`message-content ${message.self ? `self` : ``}`}>
        {message.has_error === true
          ? "Ошибка при доставке сообщения"
          : message.payload}
      </div>
    </div>
  );
};
