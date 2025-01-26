import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedItems } from '../../types';



interface FeedState {
  items: FeedItems[];
  loading: boolean;
  image:File | null;
  caption: string;
}

const initialState: FeedState = {
  items: [],
  loading: false,
  image: null,
  caption: '',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<File | null>) => {
      state.image = action.payload;
    },
    setCaption: (state, action: PayloadAction<string>) => {
      state.caption = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addFeedItem: (state, action: PayloadAction<FeedItems>) => {
      state.items.unshift(action.payload); // Add new feed item at the beginning
    },
    setFeedItems: (state, action: PayloadAction<FeedItems[]>) => {
      state.items = action.payload; // Set the entire feed items array
    },
  },
});

export const { setImage, setCaption, setLoading, addFeedItem, setFeedItems } = feedSlice.actions;
export default feedSlice.reducer;
