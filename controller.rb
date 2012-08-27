require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'
require 'rho/rhoevent.rb'
require 'base64'
require 'time'
require 'date'

class SettingsController < Rho::RhoController
  include BrowserHelper
  
  def index
    @msg = @params['msg']
    render :layout=>false, :back => url_for(:controller=>'Settings',:action=>:index )
  end


 def open_url
    System.open_url(@params['url'])
  end

  def add_event
    
    start_date = Time.parse @params['start_date'] #inlcudes timezone i.e: 20121-01-16 00:00:00 -0500
    end_date = Time.parse @params['end_date']

    #Alert.show_popup(@params.inspect)
    if @params['start_hours']
      hours = @params['start_hours'].to_i
      minutes = @params['start_minutes'].to_i
      start_date = start_date + (hours*60*60) + (minutes*60)
      end_date = start_date + 1
    else
      Alert.show_popup("No start time was available, but the event is today")
      hours = 8
      minutes = 0
      start_date = start_date + (hours*60*60) + (minutes*60)
      end_date   = start_date + 1
      forToday = "yes"
    end
    
    event_e = {'id'=>'', 'title' => @params['title'], 'start_date' => Time.parse(start_date.to_s), "end_date" => Time.parse(end_date.to_s), 'location' => @params['location'], 'notes' => @params['description']}

    new_event = Rho::RhoEvent.create!(event_e)
    if new_event != nil
      if forToday != "yes"


        Alert.show_popup( {
            :message => "Event added to your calendar.\n Make sure to confirm the date and time on the website and check whether an RSVP is needed to attend.", 
            :title => 'Tech Events', 
            :buttons => ["OK"] } )
      end
    end
  
  end
  
 
end
