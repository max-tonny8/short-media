import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Hello from '../components/Hello';

import * as actions from '../actions';
import { IStoreState } from '../types/index';


export function mapStateToProps({ enthusiasmLevel, languageName }:IStoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default connect(mapDispatchToProps, mapDispatchToProps)(Hello);
