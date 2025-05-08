import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button/Button';


const Info = ({ counter }) => {

  const infoData = {
    1: {
      title: 'Title for Button 1',
      text: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Hendrerit morbi mollis penatibus dolor faucibus mattis molestie fermentum. Velit libero aenean euismod; dapibus habitant purus. Amet lectus egestas laoreet leo nibh. Vitae purus tellus, nunc per odio velit. Pharetra taciti hendrerit sed dignissim pharetra faucibus aliquam. Mattis cubilia dolor velit velit per aenean vel. Habitant sagittis velit dis, pretium libero eros.',
      imageSrc: '/image/img1.png',
    },
    2: {
      title: 'Title for Button 2',
      text: 'At placerat augue aenean volutpat torquent magnis eros. Vestibulum elementum semper ut ullamcorper iaculis; consequat tincidunt mi. Leo litora conubia netus diam taciti gravida mi molestie. Scelerisque nibh bibendum donec; senectus fermentum dignissim. Quam nulla litora massa sagittis imperdiet, taciti dictumst nisi. Ante cursus nostra mus vitae iaculis! Curabitur arcu orci mattis turpis tempus. In himenaeos phasellus natoque aenean dictumst fringilla.',
      imageSrc: '/image/img2.png',
    },
    3: {
      title: 'Title for Button 3',
      text: 'Augue risus etiam convallis feugiat laoreet dapibus cras taciti. Fusce hac tempus eleifend et lobortis pharetra rhoncus rhoncus. Commodo maximus libero vestibulum ad fringilla. Curae primis id rhoncus at amet. Cursus phasellus imperdiet velit orci tempus conubia nascetur scelerisque. Quisque ac vitae rhoncus purus mus arcu vulputate faucibus porta. Dui curabitur fringilla scelerisque ridiculus placerat mauris. Sociosqu blandit lobortis elit sodales, orci eget vel dapibus dapibus. Mi elementum orci gravida arcu platea. Imperdiet vitae montes maximus posuere parturient ipsum integer facilisis laoreet.',
      imageSrc: '/image/img3.png',
    },
  };

  const [selectedInfo, setSelectedInfo] = useState(infoData[counter]);

  useEffect(() => {
    setSelectedInfo(infoData[counter]);
  }, [counter]);

  return (
    <div className="info-container">
      <div className="info-picture-container">
        <img src={selectedInfo.imageSrc} alt={selectedInfo.title} />
      </div>
      <div className="info-text-container">
        <h2 className="info-text-title">{selectedInfo.title}</h2>
        <p className="info-text">{selectedInfo.text}</p>
      </div>
    </div>
  );
}

export default Info;
