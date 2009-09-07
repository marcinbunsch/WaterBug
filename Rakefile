require 'rubygems'
task :pack do
  final = ''
  version = File.read('VERSION')
  dirname = "pkg/#{version}"
  Dir.mkdir(dirname) if !File.exists?(dirname)
  main =  File.read('lib/waterbug.js').split('//== CUT HERE').first
  final << main
  files = (Dir.glob('lib/*.js') - ['lib/waterbug.js', 'lib/init.js']) + Dir.glob('lib/*/*.js') + ['lib/init.js']
  files.each do |file|
    final << File.read(file) + "\n"
  end
  File.open("#{dirname}/waterbug-#{version}.js", 'wb') { |f| f.write(final) }
  
  begin
    require 'packr'
    
    minified = Packr.pack(final, :shrink_vars => true)
    File.open("#{dirname}/waterbug-#{version}-minified.js", 'wb') { |f| f.write(minified) }
    
    compressed = Packr.pack(final, :shrink_vars => true, :base62 => true)
    File.open("#{dirname}/waterbug-#{version}-packed.js", 'wb') { |f| f.write(compressed) }
    
  rescue LoadError
    puts 'Could not pack waterbug - you need to install Packr'
    puts 'To install it, type: sudo gem install packr'
  end
  
end