import { CountdownTimer } from "./_flashSaleComponents/countDownTimer";

export default function FlashsaleCounter() {
  return (
    <section className="bg-gray-900/80 bg-gradient h-12 flex items-center mb-8">
      <div className=" px-16 mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Flash Sale Text */}
          <h6 className="text-sm md:text-base font-semibold text-white uppercase tracking-tight text-center md:text-left">
            Steals & Deals Live Now — Clock’s Ticking!
          </h6>

          {/* Countdown Timer */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <CountdownTimer endDate={new Date(2025, 12, 30, 10, 0, 0)} />
          </div>
        </div>
      </div>
    </section>
  );
}
