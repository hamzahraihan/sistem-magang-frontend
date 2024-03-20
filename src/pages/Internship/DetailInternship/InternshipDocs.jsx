import PropTypes from 'prop-types';

const InternshipDocs = (props) => {
  const { docsID, text } = props;
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-sm py-2 px-3 bg-hoverColor w-fit rounded-lg text-gray-50">{text}</h1>
      <iframe className="w-full h-96 rounded-xl" src={`https://drive.google.com/file/d/${docsID}/preview`} title="doc-1"></iframe>
    </div>
  );
};

InternshipDocs.propTypes = {
  docsID: PropTypes.string,
  text: PropTypes.string,
};

export default InternshipDocs;
