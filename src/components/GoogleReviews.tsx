const GoogleReviews = () => (
    <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Customers Say About JunkNerds
            </h2>
            <p className="text-gray-600 mb-8">
                Verified Google Reviews from real Halifax homeowners.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-xl">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d362464.34903999296!2d-63.9712834335582!3d44.7858462607537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45e20ef5910ac38f%3A0xb594a84acb3d3797!2sJunkNerds%20Halifax%20-%20Junk%20Removal!5e0!3m2!1sen!2sca!4v1761585632623!5m2!1sen!2sca" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </section>
);
export default GoogleReviews;
