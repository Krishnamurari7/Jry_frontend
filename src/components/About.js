import React from "react";
import { FaUsers, FaHandshake, FaChartLine, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About Network
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connecting professionals, fostering relationships, and building successful networks
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To create a platform where professionals can connect, collaborate, and grow their networks
            in meaningful ways. We believe in the power of connections and their ability to transform
            careers and businesses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <FaUsers className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Network</h3>
            <p className="text-gray-600">
              Connect with like-minded professionals and expand your network across industries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <FaHandshake className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Opportunities</h3>
            <p className="text-gray-600">
              Discover new business opportunities and partnerships through our extensive network.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <FaChartLine className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Growth</h3>
            <p className="text-gray-600">
              Accelerate your career growth through valuable connections and mentorship.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <FaLightbulb className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation Hub</h3>
            <p className="text-gray-600">
              Share ideas, collaborate on projects, and drive innovation together.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We believe in maintaining the highest standards of professional integrity and trust.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We foster an environment where collaboration and knowledge sharing thrive.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth</h3>
              <p className="text-gray-600">
                We are committed to continuous learning and professional development.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default About; 