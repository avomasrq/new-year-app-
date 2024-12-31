import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';



const credentials = {
  347: { password: 'Xv8!rT9@bLq3', message: 'Прошел еще один год, и вот ты стал сильнее и мудрее. Поздравляем со всем, чего вы достигли, и с уроками, которые вы усвоили. Пусть этот Новый год откроет двери, о которых вы никогда не думали, и предложит вам возможность сиять еще ярче. Я верю в тебя и не могу дождаться, чтобы увидеть все невероятные вещи, которых ты совершишь. С Новым Годом!' },
  583: { password: 'Fz1$kL7#NmT4', message: 'Каждый новый год — это напоминание о том, что мы способны изобретать себя заново. Поздравляем вас с достижением этой прекрасной вехи в вашей жизни. Я надеюсь, что наступающий год принесет вам больше любви, смеха и радости, чем вы когда-либо могли себе представить. Пусть это будет год успеха, крепкого здоровья и бесконечных благ. Желаю вам всего счастья, которое может предложить мир. С Новым Годом!' },
  472: { password: 'Rq4@xY8*Hp2!', message: 'The past year has been full of growth and change, and now it’s time to embrace the new. Congratulations on your resilience, your strength, and your unwavering spirit. May this new year be a chapter of new beginnings, brighter days, and the fulfillment of all your dreams. Here’s to a year that will surpass even your greatest expectations. Happy New Year!' },
  1543: { password: 'Tz9%aV3@Lf7#', message: 'As the old year fades away, a new one filled with endless possibilities awaits. Congratulations on making it through the challenges of the past and stepping forward into a year brimming with hope, love, and opportunities. May you find joy in every moment, courage to chase your dreams, and peace in every step you take. Happy New Year, my friend!' },
  7312: { password: 'Np6$wX2!Tq5&', message: 'Пусть Новый год будет наполнен любовью, освещающей ваш путь, успехом, который следует за каждым шагом, и воспоминаниями, наполняющими ваше сердце теплом. Поздравляем вас с тем, что вы замечательный человек и приняли все, что вам подарила жизнь. В этом году желаю вам подняться на новые высоты и использовать все прекрасные возможности. С Новым годом вас и ваших близких!' },
  999: { password: 'Mv8#lK4@Rp3%', message: 'Вы с достоинством и решимостью преодолели взлеты и падения прошлого года, и теперь пришло время для новой главы. Поздравляю с тем, что ты стал сильнее, чем когда-либо. Пусть этот новый год будет годом безграничных возможностей, когда вы достигнете всего, чего пожелаете, и находите радость в каждом моменте. Впереди новые начинания и прекрасные путешествия. С Новым Годом!' },
  762: { password: 'Xy7@rT9!Lp5$', message: 'Биылғы жыл қиын болды, бірақ қазір сіздің алдыңызда жаңа тарау ашылады. Сізді жеңіп, қол жеткізген барлық жетістіктеріңізбен құттықтаймын. Жаңа жыл сізге бейбітшілік, гүлдену және ең үлкен армандарыңыздың орындалуын әкелсін. Ең жақсысы әлі алда және мен осы жаңа жылда сізді күтіп тұрған барлық тамаша нәрселерді көруді асыға күтемін. Жаңа жылыңызбен!' },
  494: { password: 'Zt6&bN2#Fq8%', message: 'Жыл аяқталып келе жатқанда, қаншалықты жеткеніңізді және қол жеткізген барлық жетістіктеріңізді атап өтуге бір сәт уақыт бөліңіз. Күшіңіз, төзімділігіңіз және осы жолда бөліскен сүйіспеншілігіңізбен құттықтаймыз. Келе жатқан жылда шексіз мүмкіндіктер бар, мен сіз оларды құшақ жая, бар жүрегіңізбен қабылдайтыныңызға күмәнім жоқ. Жаңа жылыңызбен!' },
  173: { password: 'Ly4@pV7!Tx3#', message: 'Поздравляем с победами прошлого года и уроками, которые он принес. Теперь, когда впереди новый год, желаю вам продолжать расти и процветать во всех отношениях. Пусть ваше сердце будет наполнено миром, ваша душа – целью, а ваш путь – бесконечными возможностями. Наступает удивительный год, наполненный большим количеством смеха, большей любовью и большим количеством благословений, чем когда-либо прежде. С Новым Годом!' },
  8648: { password: 'Jk9#tL3@Wz1$', message: 'Уходящий год был наполнен ростом, испытаниями и победами. Вы проявили столько силы и за это заслуживаете всех благословений, которые может предложить новый год. Пусть этот предстоящий год станет годом трансформации, личностного роста и исполнения ваших самых сокровенных мечтаний. Поздравляем с вступлением в новый год, полный любви, радости и светлых обещаний завтрашнего дня!' },
};        

const App = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials[id] && credentials[id].password === password) {
      setIsAuthenticated(true);
      setUserMessage(credentials[id].message);
      setLoginError('');
    } else {
      setLoginError('Invalid ID or Password');
    }
  };


  return (
    <div className="app-container">
      {/* Login form */}
      {!isAuthenticated ? (
        <div className="login-container">
          <h1>🎄 Жаңа жылыңызбен! 🎄</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
          {loginError && <p className="error">{loginError}</p>}
        </div>
      ) : (
        <div className="congrats-container">
          <h1>🎅  Мерекелеріңіз құтты болсын!  🎅</h1>
          <p>{userMessage}</p>
          <p>Мерекелік маусымды тамашалаңыз және алда сиқырлы жыл болсын! ✨</p>
        </div>
      )}
    </div>
  );
};

export default App;