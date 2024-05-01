export const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const validatePhoneLength = (phone, length = 8) => phone.length === length;

export const validateRegionalCodeLength = (regionalCode, length = 2) => regionalCode.length === length;

export const validateNumberOfParticipants = (numberOfParticipants, min = 1, max = 30) => numberOfParticipants >= min && numberOfParticipants <= max;