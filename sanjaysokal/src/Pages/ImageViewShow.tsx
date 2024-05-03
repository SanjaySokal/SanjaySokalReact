import React from 'react'
interface images {
  images: string;
  name: string;
  handleClick: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ImageViewShow = (props: images) => {
  return <img src={props.images} className="w-100" alt={props.name} title={props.name} onClick={props.handleClick} />;
}

export default ImageViewShow