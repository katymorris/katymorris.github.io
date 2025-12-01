import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function About() {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <main>
        <section className="about-page">
          <h2>About</h2>
          <div className="about-content">
            <p>
              I'm Kathy Morris, I like to build, explore, and learn.
            </p>
            <p>
            Outside of work, I spend a lot of time with my 7-year-old (also a builder), my partner, and staying active at the gym, hiking, good food, audiobooks, and a lot of sci-fi.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;

