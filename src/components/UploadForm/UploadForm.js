import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import uploadValidation from './uploadValidation';
// import connectData from 'helpers/connectData';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';

/*
function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout})*/
@reduxForm({
  form: 'upload',
  fields: ['name', 'memo', 'file'],
  validate: uploadValidation,
})
export default
class UploadForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    user: PropTypes.object,
  }

  render() {
    const {
      dirty,
      fields: {name, memo, file},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
      } = this.props;
    const styles = require('./UploadForm.scss');
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div className={styles.flags}>
            {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
            {field.active && <span className={styles.active} title="Active">A</span>}
            {field.visited && <span className={styles.visited} title="Visited">V</span>}
            {field.touched && <span className={styles.touched} title="Touched">T</span>}
          </div>
        </div>
      </div>;

    console.log(handleSubmit);

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, '이름')}
          {renderInput(memo, 'Memo')}
          <div className="form-group">
            <label className="col-sm-2">File</label>
            <span className="btn btn-primary btn-file">
              <span className="fileupload-new">Select file</span>
              <span className="fileupload-exists">Change</span>
              <input type="file" id="file" {...file}/>
            </span>
            <span className="fileupload-preview"></span>
            <a href="#" className="close fileupload-exists" data-dismiss="fileupload" styles={{float: 'none'}}>×</a>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} styles={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
          <tr>
            <th>Active Field</th>
            <td>{active}</td>
          </tr>
          <tr>
            <th>Dirty</th>
            <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Pristine</th>
            <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Valid</th>
            <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Invalid</th>
            <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
