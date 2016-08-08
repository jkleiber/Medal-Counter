var firstRun = true;
var intervalTime = 1000*60*10;

$(document).ready(function()
{
	countMedals();
	setInterval(countMedals, intervalTime);
});


function countMedals()
{
	
	$.get( "medal_fetcher.php", {} ).done(function( data ) 
	{
		if(data != "Medal Count unavailable at this time")
		{
			var results = jQuery.parseJSON(data);
			
			for(var i=0;i<results.length;++i)
			{
				if(firstRun == true)
				{
					$("#medal-standings-body").append("<tr id=place_"+(i+1)+">");
					
					//Place
					$("#place_"+(i+1)).append("<td id=data_"+(i+1)+"_place>" + (i+1));
					$("#place_"+(i+1)).append("</td>");
					
					//Country
					$("#place_"+(i+1)).append("<td id=data_"+(i+1)+"_name>" + results[i]['country_name']);
					$("#place_"+(i+1)).append("</td>");
					
					//Gold
					$("#place_"+(i+1)).append("<td id=data_"+(i+1)+"_gold>" + results[i]['gold_count']);
					$("#place_"+(i+1)).append("</td>");
					
					//Silver
					$("#place_"+(i+1)).append("<td id=data_"+(i+1)+"_silver>" + results[i]['silver_count']);
					$("#place_"+(i+1)).append("</td>");
					
					//Bronze
					$("#place_"+(i+1)).append("<td id=data_"+(i+1)+"_bronze>" + results[i]['bronze_count']);
					$("#place_"+(i+1)).append("</td>");
					
					var total = results[i]['gold_count'] + results[i]['silver_count'] + results[i]['bronze_count'];
					
					//Total
					$("#place_"+(i+1)).append("<td id=data_"+(i+1)+"_total>" + total);
					$("#place_"+(i+1)).append("</td>");
				}
				else
				{
					$current_country = results[i]['country_name'];
					$current_gold = results[i]['gold_count'];
					$current_silver = results[i]['silver_count'];
					$current_bronze = results[i]['bronze_count'];
					$current_total = results[i]['gold_count'] + results[i]['silver_count'] + results[i]['bronze_count'];
					
					if($current_country != $("#data_"+(i+1)+"_name").html())
					{
						$("#data_"+(i+1)+"_name").html($current_country);
					}
					
					if($current_gold != $("#data_"+(i+1)+"_gold").html())
					{
						$("#data_"+(i+1)+"_gold").html($current_gold);
					}
					
					if($current_silver != $("#data_"+(i+1)+"_silver").html())
					{
						$("#data_"+(i+1)+"_silver").html($current_silver);
					}
					
					if($current_bronze != $("#data_"+(i+1)+"_bronze").html())
					{
						$("#data_"+(i+1)+"_bronze").html($current_bronze);
					}
					
					if($current_total != $("#data_"+(i+1)+"_total").html())
					{
						$("#data_"+(i+1)+"_total").html($current_total);
					}
				}
			}
			
			firstRun = false;
			
		}
	});
	
}