import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import BackendService, { socket } from "/src/BackendService"
import { useSelector } from 'react-redux'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    currentUser: {},
    channels: [],
    selectedChannelId: undefined,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload]
    },
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload
    }
  },
})

export const initStore = createAsyncThunk(
  'app/initStore',
  async (_arg, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    await socket.connect();

    const res = await socket.emitWithAck("channel:list", {
      size: 100,
    });

    res.data.forEach((channel) => dispatch(addChannel(channel)));

    // await this.loadMessagesForSelectedChannel();

    dispatch(setIsInitialized(true))
  }
);


export const autoLogin = createAsyncThunk(
  'app/autoLogin',
  async (arg, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const navigate = arg.navigate;

    const res = await BackendService.self();

    if (res.status === 200) {
      const user = await res.json()
      dispatch(setCurrentUser(user))

      dispatch(initStore())

      navigate('/c')
    } else {
      navigate('/login')
    }
  }
)

const selectChannels = (state) => state.channels;

export const selectPublicChannels = createSelector(
  selectChannels,
  (channels) => {
    const publicChannels = [];

    channels.forEach((channel) => {
      if (channel.type === "public") {
        publicChannels.push(channel);
      }
    });

    publicChannels.sort((a, b) => {
      // always put the 'General' channel first
      if (a.name === "General") {
        return -1;
      } else if (b.name === "General") {
        return 1;
      }
      return b.name < a.name ? 1 : -1;
    });

    return publicChannels;
  }
);

const selectedChannelId = (state) => state.selectedChannelId;
export const selectedChannel = createSelector(
  [selectedChannelId, selectChannels],
  (selectedChannelId, channels) => {
    return channels.find((channel) => channel.id === selectedChannelId)
  }
)

export const { setCurrentUser, addChannel, setIsInitialized } = appSlice.actions
export default appSlice.reducer
