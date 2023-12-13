import ImageDefault from "../assets/image_default.jpg";

const CardNominatif = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className=" mx-auto bg-white rounded-3xl shadow-xl p-4">
        <div className="grid rounded-3xl max-w-sm shadow-sm place-items-center  flex-col">
          <img
            src={ImageDefault}
            className="rounded-t-3xl justify-center grid h-80 object-cover"
            alt="Yohanes Harke Wauran"
          />
          <div className="group p-6 grid z-10">
            <h4 className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2">
              Yohanes Harke Wauran
            </h4>
            <p className="text-slate-400 text-base pt-2 font-semibold">
              Balai Teknologi, Informasi dan Komunikasi Pendidikan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNominatif;
