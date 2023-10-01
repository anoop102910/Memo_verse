const Image = ({ image, style }) => {
  return (
    <div>
      <img
        className={style}
        src={`data:image/*;base64,${image}`}
      />
    </div>
  );
};

export default Image;
