import AsyncStorage from '@react-native-async-storage/async-storage';
import createContext from './CreateContext';
import { auth } from '../libs/firebase';

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch: any) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    return true;
  } else {
    return false;
  }
};

const clearErrorMessage = (dispatch: any) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signUp = (dispatch: any) => async ({ email, password }: any) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    const token = await auth.currentUser!.getIdToken();
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'signin', payload: token });
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: error.message,
    });
  }
};

const signIn = (dispatch: any) => async ({ email, password }: any) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    const token = await auth.currentUser!.getIdToken();
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'signin', payload: token });
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: error.message,
    });
  }
};

const signOut = (dispatch: any) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
};

export const { Provider, Context } = createContext(
  authReducer,
  { signIn, signOut, signUp, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
