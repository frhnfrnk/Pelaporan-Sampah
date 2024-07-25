import { Report } from "@/utils/types/report";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reportService from "./reportService";

export interface ReportState {
  report: Report | null;
  status: string;
  error: string | null;
  image: any[] | null;
}

const initialState: ReportState = {
  report: null,
  status: "",
  error: null,
  image: [],
};

export const addReport = createAsyncThunk(
  "report/addReport",
  async (report: Report, thunkAPI) => {
    try {
      const payload = await reportService.addReport(report);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchAllReports = createAsyncThunk(
  "report/fetchAllReports",
  async (_, thunkAPI) => {
    try {
      const payload = await reportService.fetchAllReports();
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHistoryReport = createAsyncThunk(
  "report/getHistoryReport",
  async (_, thunkAPI) => {
    try {
      const payload = await reportService.getHistoryReport();
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const proceedReport = createAsyncThunk(
  "report/proceedReport",
  async ({ id, status }: { id: string; status: string }, thunkAPI) => {
    try {
      const payload = await reportService.proceedReport(id, status);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const doneReport = createAsyncThunk(
  "report/doneReport",
  async ({ id, image }: { id: string; image: string[] }, thunkAPI) => {
    try {
      const payload = await reportService.doneReport(id, image);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const putReport = createAsyncThunk(
//   "report/putReport",
//   async (report: Report, id: string, thunkAPI) => {
//     try {
//       const payload = await reportService.putReport(report, id);
//       return payload;
//     } catch (error: any) {
//       const message = error?.response?.data?.message;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setDataReport: (state, action) => {
      state.report = { ...state.report, ...action.payload };
    },
    emtpyDataReport: (state) => {
      state.report = null;
      state.image = [];
    },
    setFetchImage: (state, action) => {
      state.image = action.payload;
    },
    addImage: (state, action) => {
      if (state.image !== null) {
        state.image.push(action.payload);
      }
    },
    updateImage: (state, action) => {
      const { index, newValue } = action.payload;
      if (state.image !== null) {
        state.image[index] = newValue;
      }
    },
    deleteImage: (state, action) => {
      const index = action.payload;
      if (state.image !== null) {
        state.image.splice(index, 1);
      }
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReport.fulfilled, (state, action) => {
        state.status = "success";
        state.report = action.payload;
      })
      .addCase(addReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchAllReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.status = "success";
        state.report = action.payload;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getHistoryReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHistoryReport.fulfilled, (state, action) => {
        state.status = "success";
        state.report = action.payload;
      })
      .addCase(getHistoryReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  setDataReport,
  emtpyDataReport,
  setFetchImage,
  addImage,
  updateImage,
  deleteImage,
  setLoading,
} = reportSlice.actions;

export const reportReducer = reportSlice.reducer;
