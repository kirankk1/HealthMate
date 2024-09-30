import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto p-3 text-center ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About HealthMate
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              HealthMate is a comprehensive health and wellness platform
              designed to provide users with a holistic approach to managing
              their health.
            </p>
            <p>
              Our platform offers a wide range of features that helps users to
              track their regular medication and to remind users to consume
              medicines on time by sending notifications through sms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
