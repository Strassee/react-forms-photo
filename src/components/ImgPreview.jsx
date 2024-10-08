function ImgPreview( { images, handleClose } ) {
  let result = images.map((image) => (
    <div className='image' key={image['id']}>
      <button className="btn_close" onClick={(e) => handleClose(e, image)}>&#10060;</button>
      <img className="img" src={image['img']} alt=''/>
    </div>
  ));

  return (
    <div className="img_block">
      {result}
    </div>
  )
}

export default ImgPreview;