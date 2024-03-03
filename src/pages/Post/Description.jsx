import PostDate from './PostDate';

const Description = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <PostDate />
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-xl font-bold leading-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aspernatur doloribus magnam maiores, ea iure. Quaerat aut ad quis nostrum.</h1>
        <p className="text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem explicabo facere id distinctio animi qui commodi ratione aut odio, molestiae architecto, nostrum sequi perferendis officiis eos, facilis pariatur? Aperiam,
          fugiat!
          <br /> <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque est magnam ut aliquid praesentium corporis, saepe officia illo fugit iure velit exercitationem dolore quas deleniti illum temporibus doloremque nulla dolorem?
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sit sequi quod, nesciunt quam, eveniet commodi eum aspernatur quas earum ad doloremque suscipit incidunt nobis similique eligendi vero molestias? Enim magnam quisquam,
          alias voluptatibus placeat tempora laudantium, accusantium corrupti dolore perferendis earum. Eaque dolore animi quod veritatis harum. Porro, explicabo.
        </p>
      </div>
      <div className="border-t border-slate-300 w-full"></div>
    </div>
  );
};

export default Description;
