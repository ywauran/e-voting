import ImageDefault from "../assets/image_default.jpg";

const CardNominatif = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="p-4 mx-auto bg-white shadow-xl rounded-3xl">
        <div className="grid flex-col max-w-sm shadow-sm rounded-3xl place-items-center">
          <img
            src={ImageDefault}
            className="grid justify-center object-cover rounded-t-3xl h-80"
            alt="Yohanes Harke Wauran"
          />
          <div className="grid p-6 ">
            <h4 className="font-bold sm:text-2xl ">Yohanes Harke Wauran</h4>
            <p className="pt-2 text-base font-semibold text-slate-400">
              Balai Teknologi, Informasi dan Komunikasi Pendidikan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNominatif;
