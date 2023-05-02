import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <p className='text-center mb-0 text-white'>
                &copy; {new Date().getFullYear()}: LejlekuXPress. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;