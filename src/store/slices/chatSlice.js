import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    publicMessages: [],
    conversations: [],
    activeConversationId: null,
  },
  reducers: {
    addPublicMessage: (state, action) => {
      state.publicMessages.push(action.payload);
    },
    startConversation: (state, action) => {
      const exists = state.conversations.find(
        (c) => c.id === action.payload.id
      );
      if (!exists) {
        state.conversations.push(action.payload);
      }
      state.activeConversationId = action.payload.id;
    },
    sendPrivateMessage: (state, action) => {
      const convo = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (convo) {
        convo.messages.push(action.payload.message);
        convo.lastMessage = action.payload.message.text;
        convo.time = action.payload.message.time;
      }
    },
    markAsRead: (state, action) => {
      const convo = state.conversations.find(
        (c) => c.id === action.payload
      );
      if (convo) convo.unread = 0;
    },
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },
  },
});

export const {
  addPublicMessage,
  startConversation,
  sendPrivateMessage,
  markAsRead,
  setActiveConversation,
} = chatSlice.actions;
export default chatSlice.reducer;