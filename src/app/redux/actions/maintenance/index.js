export const GETMAINTENANCE = "GETMAINTENANCE";
export const ADDSERVICE = "ADDSERVICE";
export const UPDATESERVICE = "UPDATESERVICE";
export const REMOVESERVICE = "REMOVESERVICE";
export const getMaintenance = (maintenance) => ({
  type: GETMAINTENANCE,
  payload: maintenance,
});

export const addService = (service) => ({
  type: ADDSERVICE,
  payload: service,
});

export const updateService = (service) => ({
  type: UPDATESERVICE,
  payload: service,
});

export const removeService = (id) => ({
  type: REMOVESERVICE,
  payload: id,
});