const Footer = () => {
    return (
      <footer>
        <div className="social">
        {/* rel="noreferrer" is the best practise for target="_blank" that i used in Assignment_1 */}
          <a href="mailto:srivathsavrebba@gmail.com" target="_blank" rel="noreferrer">Mail</a>
          <a href="https://github.com/SrivathsavaRebba" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/srivathsava-rebba-ab26a9323/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <p>&copy; 2026 Srivathsava Rebba. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;