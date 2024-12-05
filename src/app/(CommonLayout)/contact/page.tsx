import { MapPin, Phone, Mail } from "lucide-react";

type ContactTextAreaProps = {
  row: number;
  placeholder: string;
  name: string;
  defaultValue?: string;
};

const ContactTextArea = ({
  row,
  placeholder,
  name,
  defaultValue = "",
}: ContactTextAreaProps) => {
  return (
    <div className="mb-6">
      <textarea
        rows={row}
        placeholder={placeholder}
        name={name}
        className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
        defaultValue={defaultValue}
      />
    </div>
  );
};

type ContactInputBoxProps = {
  type: string;
  placeholder: string;
  name: string;
};

const ContactInputBox = ({ type, placeholder, name }: ContactInputBoxProps) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
      />
    </div>
  );
};

const Contact = () => {
  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <div className="md:w-10/12 w-full mx-auto ">
        <section className="relative z-10 overflow-hidden bg-white py-20  ">
          <div className="container">
            <div className="-mx-4 flex flex-wrap lg:justify-between">
              <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                <div className="mb-12 max-w-[570px] lg:mb-0">
                  <h2
                    className="mb-6 text-2xl font-semibold uppercase
                   text-deep-brown sm:text-3xl lg:text-4xl "
                  >
                    GET IN TOUCH WITH US
                  </h2>
                  <p className="mb-9 text-base tracking-tight text-charcoal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eius tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim adiqua minim veniam quis nostrud exercitation
                    ullamco.
                  </p>

                  {/* Location Section */}
                  <div className="mb-8 flex w-full max-w-[370px]">
                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-charcoal sm:h-[70px] sm:max-w-[70px]">
                      <MapPin size={32} className="text-charcoal" />
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-xl font-bold text-deep-brown">
                        Our Location
                      </h4>
                      <p className="text-base text-body-color">
                        99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                      </p>
                    </div>
                  </div>

                  {/* Phone Section */}
                  <div className="mb-8 flex w-full max-w-[370px]">
                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-charcoal sm:h-[70px] sm:max-w-[70px]">
                      <Phone size={32} className="text-charcoal" />
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-xl font-bold text-deep-brown">
                        Phone Number
                      </h4>
                      <p className="text-base text-body-color">
                        (+62)81 414 257 9980
                      </p>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="mb-8 flex w-full max-w-[370px]">
                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-charcoal sm:h-[70px] sm:max-w-[70px]">
                      <Mail size={32} className="text-charcoal" />
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-xl font-bold text-deep-brown">
                        Email Address
                      </h4>
                      <p className="text-base text-body-color">
                        info@yourdomain.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                <div className="relative rounded-lg bg-white p-8 shadow-lg sm:p-12">
                  <form>
                    <ContactInputBox
                      type="text"
                      name="name"
                      placeholder="Your Name"
                    />
                    <ContactInputBox
                      type="text"
                      name="email"
                      placeholder="Your Email"
                    />
                    <ContactInputBox
                      type="text"
                      name="phone"
                      placeholder="Your Phone"
                    />
                    <ContactTextArea
                      row={6}
                      placeholder="Your Message"
                      name="details"
                    />
                    <div>
                      <button
                        type="submit"
                        className="w-full text-xl rounded border border-deep-brown bg-deep-brown p-3 text-white transition hover:bg-opacity-90"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
