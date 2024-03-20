import PropTypes from 'prop-types';

const InternshipDocs = (props) => {
  const { docsID } = props;
  return (
    <div className="flex flex-col gap-1">
      <iframe className="w-full h-[500px] rounded-xl" src={`https://drive.google.com/file/d/${docsID}/preview`} title="doc-1"></iframe>
    </div>
  );
};

InternshipDocs.propTypes = {
  docsID: PropTypes.string,
  text: PropTypes.string,
};

export default InternshipDocs;
