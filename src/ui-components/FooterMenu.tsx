const FooterMenu = () => {
    return(
        <footer className="footer bg-gray-100 flex justify-center  ">
            <div className="flex justify-center bg-white items-center border-t-4 ">
                <div className="middle-navbar w-5/12 rounded-3xl border flex items-center justify-between space-x-2">
                    <div className='input-field p-2 flex-grow flex flex-col'>
                        <label htmlFor="default-input-1" className="block pl-2 text-sm font-semibold text-gray-900 dark:text-white align-bottom">Gdje</label>
                        <input type="text" id="default-input-1" placeholder='Potraži destinaciju' className="outline-none text-lg rounded-3xl border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white align-top p-2" />
                    </div>
                    <div className="search-button ">

                    </div>
                   
                   
                </div>

            </div>
        </footer>
    );

}
export default FooterMenu;