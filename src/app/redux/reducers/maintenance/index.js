import {
  MAINTENANCE_REQUEST as T,
} from "../../actions/utilities";

import {
  GETMAINTENANCE,
  ADDSERVICE,
  UPDATESERVICE,
  REMOVESERVICE,
} from "../../actions/maintenance";

const initialState = {
  maintenanceLoading: false,
  maintenanceSuccess: false,
  maintenanceFailure: false,
  maintenanceError: null,

  maintenance: [],

  addLoading: false,
  addSuccess: false,
  addFailure: false,
  addError: null,

  updateLoading: false,
  updateSuccess: false,
  updateFailure: false,
  updateError: null,

  removeLoading: false,
  removeSuccess: false,
  removeFailure: false,
  removeError: null,
};

// Always get maintenance data as an array
const getMaintenanceList = (state) => {
  if (Array.isArray(state.maintenance)) {
    return state.maintenance;
  }

  if (Array.isArray(state.maintenance?.services)) {
    return state.maintenance.services;
  }

  if (Array.isArray(state.maintenance?.maintenance)) {
    return state.maintenance.maintenance;
  }

  return [];
};

// Convert incoming data into an array
const normalizeMaintenance = (payload) => {
  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload?.maintenance)) {
    return payload.maintenance;
  }

  if (Array.isArray(payload?.services)) {
    return payload.services;
  }

  return [];
};

const maintenanceReducer = (state = initialState, action) => {
  const services = getMaintenanceList(state);

  switch (action.type) {

    case GETMAINTENANCE:
      return {
        ...state,
        maintenance: normalizeMaintenance(action.payload),
      };

    case ADDSERVICE:
      return {
        ...state,
        maintenance: [...services, action.payload],
      };

    case UPDATESERVICE:
      return {
        ...state,
        maintenance: services.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case REMOVESERVICE:
      return {
        ...state,
        maintenance: services.filter(
          (service) => service.id !== action.payload
        ),
      };

    case T.GET_MAINTENANCE_REQUEST:
      return {
        ...state,
        maintenanceLoading: true,
        maintenanceSuccess: false,
        maintenanceFailure: false,
        maintenanceError: null,
      };

    case T.GET_MAINTENANCE_SUCCESS:
      return {
        ...state,
        maintenanceLoading: false,
        maintenanceSuccess: true,
        maintenance: normalizeMaintenance(action.payload),
      };

    case T.GET_MAINTENANCE_FAILURE:
      return {
        ...state,
        maintenanceLoading: false,
        maintenanceFailure: true,
        maintenanceError: action.payload,
      };

    case T.ADD_SERVICE_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addFailure: false,
        addError: null,
      };

    case T.ADD_SERVICE_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        maintenance: [...services, action.payload],
      };

    case T.ADD_SERVICE_FAILURE:
      return {
        ...state,
        addLoading: false,
        addFailure: true,
        addError: action.payload,
      };

    case T.UPDATE_SERVICE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateFailure: false,
        updateError: null,
      };

    case T.UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        maintenance: services.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case T.UPDATE_SERVICE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateFailure: true,
        updateError: action.payload,
      };

    case T.REMOVE_SERVICE_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeFailure: false,
        removeError: null,
      };

    case T.REMOVE_SERVICE_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        maintenance: services.filter(
          (service) => service.id !== action.payload.id
        ),
      };

    case T.REMOVE_SERVICE_FAILURE:
      return {
        ...state,
        removeLoading: false,
        removeFailure: true,
        removeError: action.payload,
      };

    default:
      return state;
  }
};

export default maintenanceReducer;