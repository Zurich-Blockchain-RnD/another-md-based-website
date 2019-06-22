require "nokogiri"

class MySubnavGenerator < Jekyll::Generator
    def generate(site)
        parser = Jekyll::Converters::Markdown.new(site.config)

        counter = 0
        site.data["directories"] = Hash[]
        site.pages.each do |page|
            if page.ext == ".md"
                doc = Nokogiri::HTML(parser.convert(page['content']))
                directory_name = page['path'].split('/')[0]
                if directory_name != 'Homepage.md' && directory_name
                    directory_file_name = page['path'].split('/')[1]
                    directory_file_name = directory_file_name.split('.')[0]
                    file_url = page['url'].split('.')[0]
                    file_url[0] = ''
                    complete_file_url = site.baseurl + file_url

                    sub_menu = []
                    doc.css('h3').each do |heading|
                        sub_menu << { "title" => heading.text, "url" => [complete_file_url, heading['id']].join("#") }
                    end

                    if !site.data["directories"][directory_name]
                        site.data["directories"][directory_name] = Hash['directory_name' => directory_name, 'main_menu' => []]
                    end
                    site.data["directories"][directory_name]['main_menu'] << {"title" => directory_file_name, 'url' => complete_file_url, 'rel_url' => page['url'], 'sub_menu' => sub_menu}

                    counter += 1
                end

                counter = 0
                site.data["directoriess"] = Hash[]
                for directories in site.data["directories"] do
                    site.data["directoriess"][counter] = directories
                    counter += 1
                end
            end
        end
    end
end