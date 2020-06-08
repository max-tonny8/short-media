import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Hello from './Hello';

import * as actions from '@/store/actions';
import { IStoreState } from '@/store/types/index';


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
