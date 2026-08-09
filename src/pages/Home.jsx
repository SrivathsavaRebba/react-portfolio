import { useState, useEffect } from 'react';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); 

  if (isLoading) {
    return (
      <section id="intro" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading Portfolio...</h2>
      </section>
    );
  }

  return (
    <section id="intro" style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.8', fontSize: '1.15rem' }}>
      <h2 style={{ marginBottom: '20px' }}>Introduction:</h2>
      <p>Hello! I'm an aspiring software engineer passionate about core computer science and full-stack development. I enjoy building clean, responsive web applications and tackling complex algorithmic challenges. My goal is to bridge the gap between seamless user experiences and robust backend architectures.</p>
    </section>
  );
};

export default Home;