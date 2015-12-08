import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import uploadValidation from './uploadValidation';
import FileInput from 'react-file-input';
// import connectData from 'helpers/connectData';

/*
function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)*/
@reduxForm({
  form: 'upload',
  fields: ['memo', 'file', 'press'],
  validate: uploadValidation,
})
export default
class UploadForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  render() {
    const {
      fields: {memo, file, press},
      handleSubmit,
      resetForm,
      } = this.props;
    const styles = require('./UploadForm.scss');
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          <input type="text" className="form-control" id={field.name} placeholder={label} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div className={styles.flags}>
            {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
            {field.active && <span className={styles.active} title="Active">A</span>}
            {field.visited && <span className={styles.visited} title="Visited">V</span>}
            {field.touched && <span className={styles.touched} title="Touched">T</span>}
          </div>
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" id="uploadForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <div className={'col-sm-8 ' + styles.inputGroup}>
              <FileInput accept=".pdf" className="form-control" id={file.name} placeholder="파일 첨부 (pdf)" {...file}/>
              {file.touched && file.error && <div>{file.error}</div>}
            </div>
          </div>
          {renderInput(memo, '메모 ex) 내일 10시반에 찾으러 갈께요~')}
          <div className="form-group">
            <div className={'col-sm-8 ' + styles.inputGroup}>
              <div className="radio">
                <label>
                  <input type="radio" name={press.name} id={press.name} value="gongcen" checked {...press}/>
                  공업센터 4층
                </label>
              </div>
            </div>
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
      </div>
    );
  }
}
