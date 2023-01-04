import CountriesToZoneMap from "@/data/countries_to_zone_map.json";
import { Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiChevronUpDown } from "react-icons/hi2";

const CountrySelector = ({ selectedCountry, setSelectedCountry }) => {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? CountriesToZoneMap
      : CountriesToZoneMap.filter((country) => {
          return country.country.toLowerCase().includes(query.toLowerCase());
        });

  const router = useRouter();

  return (
    <div>
      <Combobox
        value={selectedCountry}
        onChange={(value) =>
          router.push(
            `/zone/${value.zone.slice(-1)}`
          )
        }
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(country) => country.country}
              placeholder="Start typing to search..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <div>
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <Combobox.Option
                    key={country.country}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={` block truncate text-left ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country.country}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <AiOutlineCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default CountrySelector;
